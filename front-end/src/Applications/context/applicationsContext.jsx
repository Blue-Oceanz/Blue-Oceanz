import { createContext, useEffect, useState } from 'react';
import Api from 'Shared/utils/Api';

const applicationsContext = createContext();

export const ApplicationsProvider = ({ children }) => {
    const [applications, setApplications] = useState([]);

    const getApplications = async () => {
        const apps = await Api.applications.getAll();
        setApplications(apps);
    };

    const changeStatus = async (id, status) => {
        const updatedApplication = await Api.applications.setStatus(id, status);
        const index = applications.findIndex((app) => app.id === id);
        applications[index] = updatedApplication;
        setApplications([...applications]);
    };

    const createApplication = async (body) => {
        const newApp = await Api.applications.create(body);
        applications.push(newApp);
        setApplications([...applications]);
    };

    const deleteApplication = async (id) => {
        const index = applications.findIndex((app) => app.id === id)
        applications.splice(index,1)
        await Api.applications.delete(id)
        setApplications([...applications]);
    };

    // const getComments = async (id) => {
    //     const index = applications.comments((app) => app.id === id)
    //     await Api.applications.comments(index)
    // }

    useEffect(getApplications, []);
    const exports = { applications, changeStatus, createApplication,deleteApplication };
    return (
        <applicationsContext.Provider value={exports}>
            {children}
        </applicationsContext.Provider>
    );
};

export default applicationsContext;
