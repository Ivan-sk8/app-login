<template>
    <div class="singin-container">
      <div class="singin-box">
        <h1 class="title">Sign In to an Account</h1>
        <div class="form-group">
          <input 
            type="text" 
            placeholder="Email" 
            v-model="email"
            class="input-field"
          />
        </div>
        <div class="form-group">
          <input 
            type="password" 
            placeholder="Password" 
            v-model="password"
            :class="{'error': errMsg}"
            class="input-field"
          />
        </div>
        <div>
          <p v-if="errMsg" class="error-message">{{ errMsg }}</p>
        </div>
        <div class="button-group">
          <button @click="register" :disabled="loading" class="submit-btn">{{ loading ? 'Signing In...' : 'Sign In' }}</button>
          <button @click="signInWithGoogle" :disabled="loading" class="google-btn">
            Sign In With Google
          </button>
        </div>
      </div>
    </div>
</template>

<script setup>
    import {ref} from "vue";
    import { getAuth, signInWithEmailAndPassword} from "firebase/auth"
    import { useRouter } from "vue-router";

    const email = ref("");
    const password = ref("");
    const errMsg = ref(); //ERROR MESSAGE
    const loading = ref(false); 
    const router = useRouter();

    const register = () => {
        const auth = getAuth();
        loading.value = true;
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then(() => {
            console.log("Succefully signed in!")
            router.oush('/Feed');

        })
        .catch((error) => {
            console.log(error.code);
            switch (error.code) {
                case "auth/invalid-email":
                    errMsg.value = "Invalid email"
                    break;
                case "auth/user-not-found":
                    errMsg.value = "No account with that email was found"
                    break;
                case "auth/wrong-password":
                    errMsg.value = "Incorrect password"
                    break;
                default:
                    errMsg.value = "Email or password was incorrect"
                    break;
            }
        })
        .finally(() => {
            loading.value = false; // Desactiva el estado de carga
        });
    }

</script>

<style scoped>
  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
  }
  
  .register-box {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }
  
  .title {
    color: #EED3B1;
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .input-field {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
  }
  
  .input-field:focus {
    outline: none;
    border-color: #4a90e2;
  }
  
  .input-field.error {
    border-color: red;
  }

  .error-message {
  color: red; 
  font-size: 0.9rem;
  text-align: center; 
  margin-top: 0.5rem; 
  }

  .submit-btn, .google-btn {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  }

  .button-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  
  .submit-btn,
  .google-btn {
    width: 100%; 
    padding: 0.75rem; 
    border: none; 
    border-radius: 4px; 
    font-size: 1rem; 
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .submit-btn {
    background: linear-gradient(to right, #47663B, #47663B);
    color: white; 
  }

  .submit-btn:hover:not(:disabled) {
    background-color: #47663B;
  }

  .submit-btn:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }

  .google-btn {
    background-color: #fff;
    color: #757575;
    border: 1px solid #ddd; 
  }
</style>