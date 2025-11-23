import { REST_BASE } from "./GlobalVariables";


export const fetchData = async (restPath) => {
    const response = await fetch(restPath);
    if (!response.ok) {
        throw { status: response.status };
    }
    return await response.json();
};

export const fetchProjects = async (projectIds, withVideo) => {
    const projectPromises = projectIds.map(async (id) => {
        const resp = await fetch(REST_BASE + "posts/" + id + "?_embed" + (withVideo ? "&acf_format=standard" : ""));
        if (resp.ok) {
            return await resp.json();
        }
        return null;
    });
    const fetchedProjects = await Promise.all(projectPromises);
    return fetchedProjects.filter(p => p !== null);
};