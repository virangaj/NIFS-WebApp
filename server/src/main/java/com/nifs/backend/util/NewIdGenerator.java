package com.nifs.backend.util;

public class NewIdGenerator {

    public static String newIDGenerator(String id) {

        String idText = id.replaceAll("[^A-Za-z]", "");
        int idNum = Integer.parseInt(id.replaceAll("[^0-9]", ""));
        idNum = idNum + 1;
        return idText + idNum;
    }
}
