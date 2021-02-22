import React from 'react';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import facebookIcon from '../../../../../assets/companiesIcons/facebookLogo.svg';
import CompanyButton from '../companyButton';

import thirdPartyIds from '../../../../../utils/data/thirdPartyIds';

const FacebookButton = ({ onSuccess, onFailure }) => {
    return (
        <FacebookLogin
            appId={thirdPartyIds.facebook.client_id}
            callback={response => onSuccess(response)}
            onFailure={onFailure}
            fields="name,email,picture"
            render={renderProps => (
                <CompanyButton
                    onClick={renderProps.onClick}
                    icon={facebookIcon}
                    company={'Facebook'}
                />
            )}
        />
    );
};

export default FacebookButton;
