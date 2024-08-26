import { User } from "./classes/User";

const user1 = new User("User1", "user1", "user1@example.com", "password123");
const user2 = new User("User2", "user2", "user2@example.com", "password123");
const user3 = new User("User3", "user3", "user3@example.com", "password123");

const tweet1 = user1.sendTweet("Tweet do User1 tipo normal", "normal");
const tweet2 = user2.sendTweet("Tweet do User2 tipo normal", "normal");
const tweet3 = user3.sendTweet("Tweet do User3 tipo normal", "normal");

// user2 vai seguir o usuário 1 e 3
user2.follow(user1);
user2.follow(user3);

// mostra a lista de usuários que o user2 segue
user2.getFollowing();

// user3 curte o tweet1
tweet1.like(user3);

// user2 responde ao tweet1
const reply1 = tweet1.reply("Resposta ao primeiro tweet!", user2.getId());

tweet1.show();
tweet2.show();
tweet3.show();

tweet1.showReplies();

// mostrar feed do user2
user2.showFeed();