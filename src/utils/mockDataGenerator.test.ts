import { describe, it, expect } from 'vitest';
import { generateRandomUser } from './mockDataGenerator';

describe('generateRandomUser function', () => {
  it('Generates a random user with the required fields', () => {
    const user = generateRandomUser();
    
    expect(user).toHaveProperty('first_name');
    expect(user).toHaveProperty('last_name');
    expect(user).toHaveProperty('email');
  });

  it('generates a valid non-empty name', () => {
    const user = generateRandomUser();
    
    expect(user.first_name).toBeDefined();
    expect(user.first_name.length).toBeGreaterThan(0);
    expect(typeof user.first_name).toBe('string');
  });

  it('generates a valid non-empty last name', () => {
    const user = generateRandomUser();
    
    expect(user.last_name).toBeDefined();
    expect(user.last_name.length).toBeGreaterThan(0);
    expect(typeof user.last_name).toBe('string');
  });

  it('generates a valid email that contains @', () => {
    const user = generateRandomUser();
    
    expect(user.email).toBeDefined();
    expect(user.email).toContain('@');
    expect(typeof user.email).toBe('string');
  });

  it('generates an email related to the name and last name', () => {
    const user = generateRandomUser();
    
    // Normalize the name and last name for comparison (as the function does)
    const normalizedFirstName = user.first_name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    
    const normalizedLastName = user.last_name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    
    // The email should contain some part of the normalized name or last name
    // We can't make an exact check because there are several possible email formats
    const containsNamePart = 
      user.email.includes(normalizedFirstName) || 
      user.email.includes(normalizedLastName) ||
      user.email.includes(normalizedFirstName[0]) ||
      user.email.includes(normalizedLastName[0]);
    
    expect(containsNamePart).toBeTruthy();
  });

  it('generates different users in consecutive calls', () => {
    const user1 = generateRandomUser();
    const user2 = generateRandomUser();
    const user3 = generateRandomUser();
    
    // It is statistically improbable that 3 generated users are identical
    // It could fail in very rare cases, but it is very unlikely
    const allSame = 
      user1.email === user2.email && 
      user2.email === user3.email;
    
    expect(allSame).toBeFalsy();
  });
}); 