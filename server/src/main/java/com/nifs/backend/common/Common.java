package com.nifs.backend.common;


public class Common {

    public String generateNewId(String lastId){
        String idText = lastId.replaceAll("[^A-Za-z]", "");
        int idNum = Integer.parseInt(lastId.replaceAll("[^0-9]", ""));
        idNum = idNum + 1;
        return idText + idNum;
    }

}
