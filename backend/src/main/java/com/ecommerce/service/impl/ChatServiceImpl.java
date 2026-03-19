package com.ecommerce.service.impl;

import com.ecommerce.dto.ChatRequest;
import com.ecommerce.dto.ChatResponse;
import com.ecommerce.service.ChatService;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatServiceImpl implements ChatService {

    private final ChatModel chatModel;

    public ChatServiceImpl(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    @Override
    public ChatResponse chat(ChatRequest chatRequest) {
        String response = chatModel.call(chatRequest.getMessage());
        return new ChatResponse(response);
    }
}
