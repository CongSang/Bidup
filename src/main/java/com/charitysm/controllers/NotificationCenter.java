/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import javax.websocket.OnClose;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author ADMIN
 */
@ServerEndpoint("/notification/{userId}")
public class NotificationCenter {

    private static Map<String, Session> sessions = new HashMap<>();

    @OnOpen
    public void onOpen(@PathParam("userId") String userId,
            Session session) throws IOException {
        session.getBasicRemote().sendText(userId + "Subscribed");
        session.getUserProperties().put("userId", userId);
        sessions.put(userId, session);
    }

    @OnClose
    public void onClose(@PathParam("userId") String userId, Session session) throws IOException {
        session.getBasicRemote().sendText("bye bye from Sharing Hope");
        sessions.remove(userId);
    }

    public static void sendMessage(String userId) throws IOException {
        Session targetSession = getSessions().get(userId);
        if (targetSession != null && targetSession.isOpen()) {
            targetSession.getBasicRemote().sendText("update_notif");
        }
        else
        {
            sessions.remove(userId);
        }
    }

    /**
     * @return the sessions
     */
    public static Map<String, Session> getSessions() {
        return sessions;
    }

    /**
     * @param aSessions the sessions to set
     */
    public static void setSessions(Map<String, Session> aSessions) {
        sessions = aSessions;
    }

}
