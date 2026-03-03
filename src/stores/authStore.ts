import { makeAutoObservable } from "mobx";

class AuthStore {
    isAuthenticated = false;
    role = null;
    pin = "";

    constructor() {
        makeAutoObservable(this);
    }

    login(role, pin) {
        // Logic to validate the pin and set the authentication state
        this.isAuthenticated = true;
        this.role = role;
        this.pin = pin;
    }

    logout() {
        this.isAuthenticated = false;
        this.role = null;
        this.pin = "";
    }

    setPin(pin) {
        this.pin = pin;
    }

    isAdmin() {
        return this.role === "admin";
    }

    isStaff() {
        return this.role === "staff";
    }
}

export const authStore = new AuthStore();