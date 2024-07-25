import { ref } from 'vue';
import { validateEmail } from '../src/views/AppCreateAccount.vue'; 

describe('validateEmail', () => {
  let email;
  let emailError;

  beforeEach(() => {
    email = ref('');
    emailError = ref('');
  });

  test('should return false and set error message for invalid email', () => {
    email.value = 'invalid-email';
    const result = validateEmail();
    expect(result).toBe(false);
    expect(emailError.value).toBe('Veuillez entrer une adresse email valide.');
  });

  test('should return true and clear error message for valid email', () => {
    email.value = 'test@example.com';
    const result = validateEmail();
    expect(result).toBe(true);
    expect(emailError.value).toBe('');
  });
});