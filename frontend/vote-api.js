const ids = ["ironman", "thor", "blackpanther", "flash", "wolverine", "other"];
class VoteRequestError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.status = status;
  }
}
function validBoard(data) {
  return (
    Number.isSafeInteger(data?.totalVotes) &&
    data.totalVotes >= 0 &&
    Array.isArray(data.board) &&
    data.board.length === ids.length &&
    new Set(data.board.map((item) => item?.id)).size === ids.length &&
    data.board.every(
      (item) =>
        item &&
        ids.includes(item.id) &&
        typeof item.label === "string" &&
        Number.isSafeInteger(item.votes) &&
        item.votes >= 0 &&
        Number.isFinite(item.percent) &&
        item.percent >= 0 &&
        item.percent <= 100,
    ) &&
    data.board.reduce((sum, item) => sum + item.votes, 0) === data.totalVotes
  );
}

export async function requestVotes({ heroId, signal } = {}) {
  const controller = new AbortController();
  const cancel = () => controller.abort();
  let timedOut = false;
  if (signal?.aborted) cancel();
  else signal?.addEventListener("abort", cancel, { once: true });
  const timeout = setTimeout(() => {
    timedOut = true;
    cancel();
  }, 10000);
  try {
    const response = await fetch("/api/votes", {
      signal: controller.signal,
      ...(heroId
        ? {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ heroId }),
          }
        : {}),
    });
    const data = await response.json().catch(() => null);
    if (controller.signal.aborted)
      throw new DOMException("Request canceled", "AbortError");
    if (!response.ok)
      throw new VoteRequestError(
        typeof data?.error === "string"
          ? data.error
          : "The fan verdict is temporarily unavailable. Please try again.",
        response.status,
      );
    if (!validBoard(data))
      throw new VoteRequestError(
        heroId
          ? "We couldn’t confirm your vote. Refresh the leaderboard before trying again."
          : "The fan verdict is temporarily unavailable. Please try again.",
      );
    return data;
  } catch (error) {
    if (signal?.aborted)
      throw new DOMException("Request canceled", "AbortError");
    if (error instanceof VoteRequestError) throw error;
    throw new VoteRequestError(
      heroId
        ? "We couldn’t confirm your vote. Refresh the leaderboard before trying again."
        : timedOut
          ? "The leaderboard took too long to respond. Please try again."
          : "Connection lost. Retry when you’re back online.",
    );
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener("abort", cancel);
  }
}
