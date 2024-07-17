package com.jisang.bangtong.model.user;

import com.jisang.bangtong.converter.AbstractEnumConverter;
import com.jisang.bangtong.converter.IEnum;

public enum SsoType implements IEnum<String> {
    KAKAO("kakao"),
    NAVER("naver"),
    GOOGLE("google");

    private final String value;

    SsoType(String value) {
        this.value = value;
    }

    @Override
    public String getValue() {
        return value;
    }

    @jakarta.persistence.Converter(autoApply = true)
    static class Converter extends AbstractEnumConverter<SsoType, String> {

        public Converter() {
            super(SsoType.class);
        }
    }
}