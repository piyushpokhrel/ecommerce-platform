package com.ecommerce.dto;

import java.math.BigDecimal;
import java.util.List;

public record Project(
        String id,
        String title,
        String description,
        String status,
        String priority,
        List<String> tags,
        int progress,
        String startDate,
        String endDate,
        int teamSize,
        BigDecimal budget,
        String image,
        String url
) {}
