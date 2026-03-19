package com.ecommerce.controller;

import com.ecommerce.dto.ChatRequest;
import com.ecommerce.dto.ChatResponse;
import com.ecommerce.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest chatRequest) {
        return chatService.chat(chatRequest);
    }
}
