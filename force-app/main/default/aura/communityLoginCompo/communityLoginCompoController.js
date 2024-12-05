({
    login : function(component, event, helper) {
        // Get the username and password values from the component attributes
        var username = component.get("v.username");
        var password = component.get("v.password");

        // Perform any login logic here (e.g., authentication with a backend server)
        // For example, you can use JavaScript's XMLHttpRequest or fetch API to send the login request
        // to your backend server or directly redirect the user to the login URL.

        // For demonstration purposes, we will directly redirect the user to the login URL.
        var loginUrl = 'https://radicalsoftware2-dev-ed.develop.my.site.com/s/';
        window.location.href = loginUrl;
    }
})