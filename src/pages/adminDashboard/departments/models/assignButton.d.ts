import { ButtonProps } from '@material-ui/core/Button';

interface Props extends ButtonProps {
    icon: 'team' | 'document';
    actionIcon: 'add' | 'manage';
}

export default Props;
