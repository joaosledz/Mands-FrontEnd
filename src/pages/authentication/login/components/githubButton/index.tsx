import React from 'react';

import CompanyButton from '../companyButton';

import githubIcon from '../../../../../assets/socialMedia/Github.png';

import { toQuery } from './utils';
import PopupWindow from './PopupWindow';

interface ButtonProps {
    clientId: string;
    clientSecret: string;
    onSuccess(data: any): void;
    onFailure(error: any): void;
}

const GithubButton: React.FC<ButtonProps> = ({
    clientId,
    clientSecret,
    onSuccess,
    onFailure,
}) => {
    const scope: string = 'user:email';

    const onBtnClick = () => {
        const search = toQuery({
            client_id: clientId,
            scope,
        });

        const popup = PopupWindow.open(
            'github-oauth-authorize',
            `https://github.com/login/oauth/authorize?${search}`,
            { height: 1000, width: 600 }
        );

        popup.then(
            (data: any) => onSuccess(data),
            (error: any) => onFailure(error)
        );
    };

    return (
        <CompanyButton
            company="GitHub"
            icon={githubIcon}
            onClick={onBtnClick}
        />
    );
};

export default GithubButton;
