<template>
    <div class="login-form">
        <form>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" class="form-input" required placeholder="Enter your email">
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" class="form-input" required placeholder="Enter your password">
            </div>

            <button type="submit" class="login-button">Login</button>
        </form>
    </div>
</template>

<style scoped>
.login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
}

.form-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.login-button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.login-button:hover {
    background-color: #45a049;
}
</style>