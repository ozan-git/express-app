import { CHAT_ROOM_TYPES } from '../models/ChatRoom.js';

class MessageValidator {
    static validate(message) {
        const { userIds, type } = message;
        const errors = {};
        let isBodyValid = true;

        if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
            errors.userIds = 'userIds is required and must be an array of strings.';
            isBodyValid = false;
        }

        // CHAT_ROOM_TYPES.includes is not a function so do not use it
        if (!type || typeof type !== 'string' || !CHAT_ROOM_TYPES.ENGLISH_LANG === type || !CHAT_ROOM_TYPES.SPANISH_LANG === type) {
            errors.type = 'type is required and must be a string.';
            isBodyValid = false;
        }

        return { isValid: isBodyValid, errors };
    }
}

export default MessageValidator;