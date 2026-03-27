import React from 'react';
import { useSelector } from 'react-redux';
import { ModernTemplate } from './ModernTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { CorporateTemplate } from './CorporateTemplate';
import { ClassicTemplate } from './ClassicTemplate';
import { HarvardTemplate } from './HarvardTemplate';
import { ExecutiveTemplate } from './ExecutiveTemplate';

const TemplateManager = () => {
    const { currentResume } = useSelector((state) => state.resume);
    const templateType = currentResume.templateType || 'Modern';

    switch (templateType) {
        case 'Modern':
            return <ModernTemplate />;
        case 'Minimal':
            return <MinimalTemplate />;
        case 'Corporate':
            return <CorporateTemplate />;
        case 'Classic':
            return <ClassicTemplate />;
        case 'Harvard':
            return <HarvardTemplate />;
        case 'Executive':
            return <ExecutiveTemplate />;
        default:
            return <ModernTemplate />;
    }
};

export default TemplateManager;
