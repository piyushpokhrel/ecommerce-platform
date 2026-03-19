package com.ecommerce.service;

import com.ecommerce.dto.ChatRequest;
import com.ecommerce.dto.ChatResponse;

public interface ChatService {
    ChatResponse chat(ChatRequest chatRequest);
}
