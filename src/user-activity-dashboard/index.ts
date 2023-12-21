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

const typeOfActivities: Array<TypeOfActivity> = [
  'pageView',
  'buttonClick',
  'formSubmit',
]

type Activity = {
  userId: string
  timestamp: number
}

const activities = new Map<TypeOfActivity, Array<Activity>>()

export function recordActivity(userId: string, typeOfActivity: TypeOfActivity) {
  cleanup()

  const activity = {
    userId,
    timestamp: Date.now(),
  }

  const activitiesForType = activities.get(typeOfActivity) || []
  activitiesForType.unshift(activity)
  activities.set(typeOfActivity, activitiesForType)
}

export function provideSummaryOfActivities() {
  cleanup()

  const summary: Record<TypeOfActivity, number> = {
    pageView: 0,
    buttonClick: 0,
    formSubmit: 0,
  }

  typeOfActivities.forEach((typeOfActivity) => {
    const activitiesForType = activities.get(typeOfActivity) || []
    summary[typeOfActivity] = activitiesForType.length
  })

  return `Summary of activities in the last 10 minutes: ${JSON.stringify(
    summary
  )}`
}

function cleanup() {
  const now = Date.now()
  const tenMinutesAgo = now - 10 * 60 * 1000

  typeOfActivities.forEach((typeOfActivity) => {
    const activitiesForType = activities.get(typeOfActivity) || []
    // If timestamp is more than 10 minutes ago, remove it
    const activitiesAfterTenMinutesAgo = activitiesForType.filter(
      (activity) => activity.timestamp > tenMinutesAgo
    )
    activities.set(typeOfActivity, activitiesAfterTenMinutesAgo)
  })
}
