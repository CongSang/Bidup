<%@page import="com.restfb.types.User"%>
<%@page import="com.restfb.types.ProfilePictureSource"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<div class="home-content">
    <h1>Home content</h1>
    <%
        User u = (User) request.getAttribute("user");
        if(u != null) {
            out.print(u.getId());
            out.print(u.getName());
            out.println(u.getEmail());
        }
    %>
</div>