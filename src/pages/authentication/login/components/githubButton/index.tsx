import React from 'react';

import { toQuery } from './utils';
import PopupWindow from './PopupWindow';

interface ButtonProps {
    clientId: string;
    onSuccess(data: any): void;
    onFailure(error: any): void;
    render?:
        | ((props: {
              onClick(): void;
              disabled?: boolean | undefined;
          }) => JSX.Element)
        | undefined;
}

const GithubButton: React.FC<ButtonProps> = ({
    clientId,
    onSuccess,
    onFailure,
    render,
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
            ({ code }: any) => onSuccess(code),
            (error: any) => onFailure(error)
        );
    };

    if (render) {
        return render({ onClick: onBtnClick });
    }

    return <button onClick={onBtnClick}>Login com github</button>;
};

export default GithubButton;
