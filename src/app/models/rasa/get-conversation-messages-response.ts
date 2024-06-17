export interface Message {
    asked_question: string;
    conversation_id: string;
    creation_datetime: string;
    grade: string;
    message_id: string;
    question_answer: string;
}

export interface GetConversationMessagesResponse {
    conversation_id: string;
    messages: Message[];
}