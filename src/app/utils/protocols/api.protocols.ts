//API localstorage definitions
export const EXPIRES_IN: string = "escomio_angular_to_python_v1_expires";
export const ROLE: string = "escomio_angular_to_python_v1_role";
export const USERNAME: string = "escomio_angular_to_python_v1_username";

//API Auth Endpoints
export const LOGIN : string = "auth/sign-in";
export const AUTHORIZED_HELLO_WORLD: string = "auth/authorized-hello-world";
export const LOGOUT: string = "auth/logout";
export const SIGN_UP: string = "auth/sign-up";
export const REFRESH = "/auth/refresh_token";

// API Rasa Endpoints
export const TEST_QUESTION: string = 'rasa/test-question';
export const GET_CONVERSATIONS: string = 'rasa/get-conversations';
export const GET_CONVERSATIONS_MESSAGES: string = 'rasa/get-conversation_messages';
export const CREATE_CONVERSATION: string = 'rasa/create-conversation';
export const ADD_MESSAGE: string = 'rasa/add-message-to-conversation';
export const UPDATE_MESSAGE_GRADE: string = 'rasa/update-message-grade';
export const SUGGEST_BY_CHAT: string = 'rasa/suggest-by-chat';
export const DELETE_CONVERSATION: string = 'rasa/delete-conversation';
export const UPDATE_NAME = 'rasa/update-conversation-name';

// API Admin Endpoints
export const GET_USERS = 'admin/get-users';
export const GET_MESSAGES = 'admin/get-messages';
export const GET_SUGGESTIONS = 'admin/get-suggestions'

// API Health Endpoints
export const GET_SERVICE_VERSION: string = "health/get-version";

