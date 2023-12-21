/**
 *  Our application has a feature where users can subscribe to different topics (like sports, technology, entertainment, etc.). We are planning to introduce a notification system that alerts users when there's new content in their subscribed topics. The system needs to track user subscriptions efficiently and handle sending notifications to the right users when new content is added.
 *
 * 1. Implement a Subscription Tracking System: Design a system to track which users are subscribed to which topics. Consider using Set and Map for efficient data management.
 *
 * 2. Content Update Notification Mechanism: Create a function that, given a topic, retrieves all users subscribed to that topic and simulates sending a notification to them.
 *
 * 3. Handle Unsubscription: Implement a function to allow users to unsubscribe from topics.
 *
 */

type User = {
  id: string
  name: string
}

type Topic = {
  id: string
  name: string
}

// Map to store which users are subscribed to each topic (by topic ID)
const topicSubscriptions = new Map<string, Set<string>>()

// Example users for demonstration
const users: Array<User> = [
  { id: 'user1', name: 'Alice' },
  { id: 'user2', name: 'Bob' },
]

function subscribeUserToTopic(userId: string, topicId: string) {
  if (!topicSubscriptions.has(topicId)) {
    topicSubscriptions.set(topicId, new Set())
  }
  topicSubscriptions.get(topicId).add(userId)
}

function unsubscribeUserFromTopic(userId: string, topicId: string) {
  topicSubscriptions.get(topicId)?.delete(userId)
}

function getSubscribedUsers(topicId: string): Array<string> {
  return Array.from(topicSubscriptions.get(topicId) || [])
}

function notifyUsersAboutTopicUpdate(topicId: string) {
  const subscribedUsers = getSubscribedUsers(topicId)
  subscribedUsers.forEach((userId) => {
    console.log(`Notifying user ${userId} about update in topic ${topicId}`)
  })
}

// Example Usage
subscribeUserToTopic('user1', 'sports')
notifyUsersAboutTopicUpdate('sports')
