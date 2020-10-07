import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: 'team' | 'document';
    actionIcon: 'add' | 'manage';
}

export default Props;
