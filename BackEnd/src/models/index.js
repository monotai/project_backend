import User from './User.js';
import Post from './Post.js';
import Comment from './Comment.js';
import Reaction from './Reaction.js';
import Friendship from './Friendship.js';
import Message from './Message.js';
import Share from './Share.js';
import Notification from './Notification.js';

// Posts
User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

// Comments
User.hasMany(Comment, { foreignKey: 'user_id' });
Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });
Comment.belongsTo(Comment, { foreignKey: 'parent_comment_id' }); // nested

// Reactions
User.hasMany(Reaction, { foreignKey: 'user_id' });
Reaction.belongsTo(User, { foreignKey: 'user_id' });
Reaction.belongsTo(Post, { foreignKey: 'post_id' });
Reaction.belongsTo(Comment, { foreignKey: 'comment_id' });

// Friendships
User.hasMany(Friendship, { foreignKey: 'user_id1' });
User.hasMany(Friendship, { foreignKey: 'user_id2' });

// Messages
User.hasMany(Message, { foreignKey: 'sender_id' });
User.hasMany(Message, { foreignKey: 'receiver_id' });
Message.belongsTo(User, { foreignKey: 'sender_id' });
Message.belongsTo(User, { foreignKey: 'receiver_id' });

// Shares
User.hasMany(Share, { foreignKey: 'user_id' });
Post.hasMany(Share, { foreignKey: 'post_id' });

// Notifications
Notification.belongsTo(User, { foreignKey: 'user_id' });
Notification.belongsTo(Post, { foreignKey: 'post_id' });
Notification.belongsTo(Share, { foreignKey: 'share_id' });
Notification.belongsTo(Comment, { foreignKey: 'comment_id' });
Notification.belongsTo(Message, { foreignKey: 'message_id' });

export {
  User, Post, Comment, Reaction,
  Friendship, Message, Share, Notification
};
