/**
 * Our application is evolving into a more interactive platform, and we're about to introduce a feature that requires real-time monitoring of user activities. The product team needs a system to track and analyze different types of user activities (like page views, button clicks, and form submissions) in real-time. The main challenge is to provide a way to not only track these activities but also to generate quick summaries of recent activity trends.
 *
 * Implement a function to track user activities. Each activity should have a type (e.g., 'pageView', 'buttonClick', 'formSubmit'), a user ID, and a timestamp.
 *
 * Create a function to provide a summary of activities in the last 10 minutes. This summary should include a count of each type of activity.
 *
 * Consider Efficient Data Handling: Since the system needs to handle a potentially high volume of activities, think about how to store and process this data efficiently.
 *
 */

type TypeOfActivity = 'pageView' | 'buttonClick' | 'formSubmit'

const activities = new Map<TypeOfActivity, Array<Activity>>()

type Activity = {
  userId: string
  timestamp: number
}

export function recordActivity(userId: string, typeOfActivity: TypeOfActivity) {
  const now = Date.now()
  const activity = { userId, timestamp: now }

  if (!activities.has(typeOfActivity)) {
    activities.set(typeOfActivity, [])
  }

  const activitiesForType = activities.get(typeOfActivity) as Array<Activity>
  activitiesForType.push(activity) // Push new activity to the end

  // Clean up if the array length exceeds a certain number (e.g., 100)
  if (activitiesForType.length > 100) {
    cleanUp(typeOfActivity)
  }
}

export function provideSummaryOfActivities() {
  const tenMinutesAgo = Date.now() - 10 * 60 * 1000
  const summary: Record<TypeOfActivity, number> = {
    pageView: 0,
    buttonClick: 0,
    formSubmit: 0,
  }

  for (const [typeOfActivity, activitiesForType] of activities) {
    summary[typeOfActivity] = activitiesForType.filter(
      (activity) => activity.timestamp > tenMinutesAgo
    ).length
  }

  return `Summary of activities in the last 10 minutes: ${JSON.stringify(
    summary
  )}`
}

function cleanUp(typeOfActivity: TypeOfActivity) {
  const tenMinutesAgo = Date.now() - 10 * 60 * 1000
  const activitiesForType = activities.get(typeOfActivity) as Array<Activity>

  // Remove activities older than 10 minutes
  while (
    activitiesForType.length &&
    activitiesForType[0].timestamp < tenMinutesAgo
  ) {
    activitiesForType.shift()
  }
}
