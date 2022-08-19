function logout() {
    FB.logout();
    pushSocket.close();
}