import React, { useState } from 'react';
import { useUsers } from '../hooks';
import { toast } from 'sonner';
import { generateRandomUser } from '../../../utils/mockDataGenerator';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { User } from '../types';

interface UserFormProps {
  onSubmit?: (user: User) => void;
  onCancel?: () => void;
}

export function UserForm({ onSubmit, onCancel }: UserFormProps) {
  const { t } = useTranslation(['common', 'users']);
  const { createMutation } = useUsers();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.first_name || !form.last_name || !form.email) {
      toast.error(t('userForm.validation.requiredFields', { ns: 'users' }));
      return;
    }
    
    // Crear el objeto usuario
    const newUser: User = {
      id: Math.floor(Math.random() * 1000),
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      avatar: '',
    };
    
    // Si se proporcionó una función onSubmit externa, usarla
    if (onSubmit) {
      onSubmit(newUser);
      return;
    }
    
    // De lo contrario, usar la mutación interna
    createMutation.mutate(form, {
      onSuccess: () => {
        toast.success(t('userForm.toast.success', { ns: 'users' }));
        setForm({
          first_name: '',
          last_name: '',
          email: '',
        });
      },
      onError: (error) => {
        toast.error(t('userForm.toast.error', { ns: 'users', error: error.message }));
      }
    });
  };
  
  // Generate random data
  const generateRandomData = () => {
    const randomUser = generateRandomUser();
    setForm(randomUser);
  };
  
  return (
    <div className="p-4 bg-white border border-gray-200 shadow-sm dark:bg-gray-900 dark:border-none rounded-lg mb-6 max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{t('userForm.title', { ns: 'users' })}</h2>
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={generateRandomData}
          className="flex items-center gap-2 transition-all hover:scale-105 hover:bg-purple-50 dark:hover:bg-purple-900/20"
        >
          <Wand2 className="h-4 w-4 text-purple-500" />
          <span>{t('userForm.randomData', { ns: 'users' })}</span>
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium mb-1">
              {t('users.form.name', { ns: 'common' })}
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              value={form.first_name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder={t('users.form.name', { ns: 'common' })}
            />
          </div>
          <div>
            <label htmlFor="last_name" className="block text-sm font-medium mb-1">
              {t('users.form.surname', { ns: 'common' })}
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              value={form.last_name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder={t('users.form.surname', { ns: 'common' })}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            {t('users.form.email', { ns: 'common' })}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder={t('userForm.emailPlaceholder', { ns: 'users' })}
          />
        </div>
        
        <div className="flex justify-end gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:text-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {t('buttons.cancel', { ns: 'common' })}
            </button>
          )}
          
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-4 rounded-md
                     transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createMutation.isPending ? t('userForm.saving', { ns: 'users' }) : t('buttons.save', { ns: 'common' })}
          </button>
        </div>
      </form>
    </div>
  );
} 