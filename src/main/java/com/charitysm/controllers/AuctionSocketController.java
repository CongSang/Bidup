/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers;

import static com.charitysm.controllers.NotificationCenter.getSessions;
import com.charitysm.utils.NotifMessageEncoder;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author ADMIN
 */
@ServerEndpoint(value = "/auction/{userId}",
                encoders = NotifMessageEncoder.class)
public class AuctionSocketController{
    private static Map<String, Session> sessions = new HashMap<>();

    @OnOpen
    public void onOpen(@PathParam("userId") String userId,
            Session session) throws IOException, EncodeException {
        session.getUserProperties().put("userId", userId);
        sessions.put(userId, session);
    }

    @OnClose
    public void onClose(@PathParam("userId") String userId, Session session) throws IOException {
        session.getBasicRemote().sendText("bye bye from Bidup");
        sessions.remove(userId);
    }
    
    public static void sendMessage(String userId, Object message) throws IOException, EncodeException {
        Session targetSession = getSessions().get(userId);
        if (targetSession != null && targetSession.isOpen()) {
            targetSession.getBasicRemote().sendObject(message);
        }
        else
        {
            sessions.remove(userId);
        }
    }
    
    public static void broadcast(Object message) throws IOException, EncodeException {
        for (Map.Entry<String, Session> entry : sessions.entrySet()){
            Session s = entry.getValue();
            if(s.isOpen())
                s.getBasicRemote().sendObject(message);
        }
    }
}
