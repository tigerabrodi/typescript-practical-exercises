/**
 * Backstory: Our application is expanding rapidly, and we've just realized that we need to improve our user authentication system. Currently, we have a basic setup, but we want to add a feature to track login attempts. This is crucial for both security and user experience, as we plan to implement features like alerting users to unusual login activity.
 *
 * 1. Implement a function to track login attempts. Each time a user attempts to log in, this function should record the attempt, including the user's ID and the timestamp of the attempt.
 *
 * 2. Create an API endpoint that retrieves the last five login attempts for a given user. This endpoint should return the timestamps of these attempts.
 *
 */

const attempts = new Map<string, Array<Date>>()

export const trackLoginAttempt = (userId: string) => {
  const attemptsForUser = attempts.get(userId) || []

  // Add the current attempt to the beginning of the array
  attemptsForUser.unshift(new Date())

  // Only keep the last 5 attempts
  if (attemptsForUser.length > 5) {
    attemptsForUser.pop()
  }

  attempts.set(userId, attemptsForUser)

  return attemptsForUser
}

export const getLoginAttempts = (userId: string) => {
  return attempts.get(userId) || []
}
