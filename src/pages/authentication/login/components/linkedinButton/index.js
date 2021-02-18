import React from 'react';
import CompanyButton from '../companyButton';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import linkedinIcon from '../../../../../assets/socialMedia/Linkedin.png';

const LinkedInButton = ({ handleFailure, handleSuccess }) => {
    return (
        <LinkedIn
            clientId="81lx5we2omq9xh"
            onFailure={handleFailure}
            onSuccess={handleSuccess}
            redirectUri={`${window.location.origin}/linkedin`}
            renderElement={({ onClick, disabled }) => (
                <CompanyButton
                    icon={linkedinIcon}
                    company={'Linkedin'}
                    onClick={onClick}
                    disabled={disabled}
                />
            )}
        />
    );
};

export default LinkedInButton;
