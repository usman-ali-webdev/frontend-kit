<template>
    <div class="in-login-form">
        <form>
            <div class="in-form-group">
                <label class="in-label" for="email">Email</label>
                <input type="email" id="email" class="in-form-input" required placeholder="Enter your email">
            </div>

            <div class="in-form-group">
                <label class="in-label" for="password">Password</label>
                <input type="password" id="password" class="in-form-input" required placeholder="Enter your password">
            </div>

            <button type="submit" class="in-login-button">Login</button>
        </form>
    </div>
</template>

<style scoped>
.in-login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}

.in-form-group {
    margin-bottom: 1rem;
}

.in-label {
    display: block;
    margin-bottom: 0.5rem;
}

.in-form-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.in-login-button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.in-login-button:hover {
    background-color: #45a049;
}
</style>