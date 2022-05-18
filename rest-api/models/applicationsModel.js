import db, { helpers, QueryFile } from './connection.js';
import commentsModel from './commentsModel.js';
import updatesModel from './updatesModel.js';

const applicationsModel = {};

applicationsModel.getAllForUser = async (userId) => {
//     const query = new QueryFile('./models/sql/applications/getAllFromUser.sql');
     const query = new QueryFile('./getAllFromUser.sql');
    const applications = await db.manyOrNone(query, { userId });
    for (let application of applications) {
        const { id } = application;
        const comments = await commentsModel.getAll(id);
        const updates = await updatesModel.getAll(id);
        application.comments = comments;
        application.updates = updates;
    }
    return applications;
};

applicationsModel.getApplicationById = async (appId) => {
    const application = await db.oneOrNone(
        `SELECT
            application_id AS "id",
            company, 
            job_title AS "title",
            deadline,
            post_url AS "url",
            description,
            note,
            status,
            salary,
            location 
            FROM applications 
            WHERE application_id=$(appId)
            ORDER BY id;`,
        { appId }
    );
    const { id } = application;
    application.comments = await commentsModel.getAll(id);
    application.updates = await updatesModel.getAll(id);
    return application;
};

applicationsModel.createApplication = async (applicationObj) => {
    const insertQuery = helpers.insert(applicationObj, null, 'applications');
    const newApplication = await db.one(
        insertQuery +
            `RETURNING application_id AS id,
            company, 
            job_title AS "title",
            deadline,
            post_url AS url,
            description,
            note,
            status,
            salary,
            location`
    );
    newApplication.comments = [];
    newApplication.updates = [];
    return newApplication;
};

applicationsModel.updateApplication = async (id, obj) => {
    const updateQuery = helpers.update(obj, null, 'applications');
    const updatedApplication = await db.one(
        updateQuery +
            `WHERE application_id=$1 RETURNING application_id AS id,
            company, 
            job_title AS "title",
            deadline,
            post_url AS url,
            description,
            note,
            status,
            salary,
            location`,
        [id]
    );
    const comments = await commentsModel.getAll(updatedApplication.id);
    const updates = await updatesModel.getAll(updatedApplication.id);
    updatedApplication.comments = comments;
    updatedApplication.updates = updates;
    return updatedApplication;
};
applicationsModel.deleteApplication = async (id) => {
    const deletedApplication = await db.one(
        'DELETE FROM applications WHERE application_id=$1 RETURNING *',
        [id]
    );
    return deletedApplication;
};

export default applicationsModel;
