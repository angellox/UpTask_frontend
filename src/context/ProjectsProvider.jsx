import { useState, useEffect, createContext } from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import clientAxios from '../config/clientAxios';
import getConfigRequest from '../helpers/configRequests';


let socket;
const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {

    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({});
    const [alert, setAlert] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [modalFormTask, setModalFormTask] = useState(false);
    const [task, setTask] = useState({});
    const [modalDeleteTask, setModalDeleteTask] = useState(false);
    const [collaborator, setCollaborator] = useState({});
    const [modalDeleteCollab, setModalDeleteCollab] = useState(false);
    const [searchEngine, setSearchEngine] = useState(false);

    const navigate = useNavigate();
    const { auth } = useAuth();

    useEffect(() => {
        const getProject = async () => {
            try {
                const token = localStorage.getItem('UpTaskToken');
                if (!token) return;

                const config = getConfigRequest(token);

                const { data } = await clientAxios('/projects', config);
                setProjects(data);
            } catch (error) {
                console.log(error);
            }
        }
        getProject();
    }, [auth]);

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL);
    }, []);

    const showAlert = alert => {
        setAlert(alert);
        setTimeout(() => {
            setAlert({});
        }, 5000);
    }

    const submitProject = async project => {

        if (project.id) {
            await editProject(project);
        } else {
            await newProject(project);
        }

    }

    const editProject = async project => {
        try {
            const token = localStorage.getItem('UpTaskToken');
            if (!token) return;

            const config = getConfigRequest(token);

            const { data } = await clientAxios.put(`/projects/${project.id}`, project, config);

            const projectsUpdated = projects.map(p => p._id === project.id ? data : p);
            setProjects(projectsUpdated);

            setAlert({
                msg: 'Project has been updated!',
                error: false
            });

            setTimeout(() => {
                setAlert({});
                navigate('/projects');
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    const newProject = async project => {
        try {
            const token = localStorage.getItem('UpTaskToken');
            if (!token) return;

            const config = getConfigRequest(token);

            const { data } = await clientAxios.post('/projects', project, config);

            setProjects([...projects, data]);

            setAlert({
                msg: 'Project has been created!',
                error: false
            });

            setTimeout(() => {
                setAlert({});
                navigate('/projects');
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    const getProject = async id => {

        setIsLoading(true);
        try {
            const token = localStorage.getItem('UpTaskToken');
            if (!token) return;

            const config = getConfigRequest(token);

            const { data } = await clientAxios(`/projects/${id}`, config);
            setProject(data);
            setAlert({});
        } catch (error) {
            navigate('/projects');
            setAlert({
                msg: error.response.data.msg,
                error: true
            });

            setTimeout(() => {
                setAlert({});
            }, 3000);
        }

        setIsLoading(false);
    };

    const deleteProject = async (id) => {
        try {
            const token = localStorage.getItem('UpTaskToken');
            if (!token) return;

            const config = getConfigRequest(token);

            const { data } = await clientAxios.delete(`/projects/${id}`, config);

            setAlert({
                msg: data.msg,
                error: false
            });

            // Sync state
            const projectsUpdated = projects.filter(p => p._id != id);
            setProjects(projectsUpdated);

            setTimeout(() => {
                setAlert({});
                navigate('/projects');
            }, 3000);

        } catch (error) {
            console.log(error);
        }
    };

    const handleModalTask = () => {
        setModalFormTask(!modalFormTask);
        setTask({});
    };

    const submitTask = async task => {

        if (task?.id) {
            await editTask(task);
        } else {
            await createTask(task);
        }
    };

    const createTask = async task => {
        try {
            const token = localStorage.getItem('UpTaskToken');
            if (!token) return;

            const config = getConfigRequest(token);

            const { data } = await clientAxios.post('/tasks', task, config);

            setAlert({});
            setModalFormTask(false);
            // Socket.io
            socket.emit('new task', data);
        } catch (error) {
            console.log(error);
        }
    };

    const editTask = async task => {
        try {
            const token = localStorage.getItem('UpTaskToken');
            if (!token) return;

            const config = getConfigRequest(token);
            const { data } = await clientAxios.put(`/tasks/${task.id}`, task, config);

            setAlert({});
            setModalFormTask(false);

            // Socket.io
            socket.emit('edit task', data);

        } catch (error) {
            console.log(error);
        }
    };

    const handleModalEditTask = task => {
        setTask(task);
        setModalFormTask(true);
    };

    const handleModalDeleteTask = task => {
        setTask(task);
        setModalDeleteTask(!modalDeleteTask);
    };

    const deleteTask = async () => {
        try {
            const token = localStorage.getItem('UpTaskToken');
            if (!token) return;

            const config = getConfigRequest(token);
            const { data } = await clientAxios.delete(`/tasks/${task._id}`, config);
            setAlert({
                msg: data.msg,
                error: false
            });

            const projectUpdated = { ...project };
            projectUpdated.tasks = projectUpdated.tasks.filter(t => t._id !== task._id);

            //setProject(projectUpdated);
            // Socket.io
            socket.emit('delete task', task);
            setTask({});
            setModalDeleteTask(false);

            setTimeout(() => {
                setAlert({});
            }, 3000);

        } catch (error) {
            console.log(error);
        }
    };

    const submitCollab = async email => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('UpTaskToken');
            if (!token) return;

            const config = getConfigRequest(token);
            const { data } = await clientAxios.post('/projects/collaborators', { email }, config);

            setCollaborator(data);
            setAlert({});
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setIsLoading(false);
        }

    };

    const addCollaborator = async email => {
        try {
            const token = localStorage.getItem('UpTaskToken');
            if (!token) return;

            const config = getConfigRequest(token);

            const { data } = await clientAxios.post(`/projects/collaborators/${project._id}`, email, config);

            setAlert({
                msg: data.msg,
                error: false
            });
            setCollaborator({});
            setTimeout(() => {
                setAlert({});
            }, 3000);

        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    };

    const handleModalDeleteCollab = collab => {
        setModalDeleteCollab(!modalDeleteCollab);
        setCollaborator(collab);
    }

    const deleteCollab = async () => {
        try {
            const token = localStorage.getItem('UpTaskToken');
            if (!token) return;

            const config = getConfigRequest(token);
            const { data } = await clientAxios.post(`/projects/delete-collaborators/${project._id}`, { id: collaborator._id }, config);

            setAlert({
                msg: data.msg,
                error: false
            });

            const projectUpdated = { ...project };
            projectUpdated.collaborators = projectUpdated.collaborators.filter(c => c._id !== collaborator._id);

            setProject(projectUpdated);
            setCollaborator({});
            setModalDeleteCollab(!modalDeleteCollab);
            setTimeout(() => {
                setAlert({});
            }, 3000);
        } catch (error) {
            console.log(error.response);
        }
    };

    const completeTask = async id => {
        try {
            const token = localStorage.getItem('UpTaskToken');
            if (!token) return;

            const config = getConfigRequest(token);

            const { data } = await clientAxios.post(`/tasks/status/${id}`, {}, config);

            setTask({});
            setAlert({});

            // Socket.io
            socket.emit('change status', data);
        } catch (error) {
            console.log(error.response);
        }
    };

    const handleSearchEngine = () => {
        setSearchEngine(!searchEngine);
    };

    // Handler for Socket io -> State vs Server
    const syncTaskState = (task) => {
        // Add task to state
        const projectUpdated = { ...project };
        projectUpdated.tasks = [...projectUpdated.tasks, task];
        setProject(projectUpdated);
    };

    const syncTaskStateDelete = (task) => {
        // Delete task and added it to state
        const projectUpdated = { ...project };
        projectUpdated.tasks = projectUpdated.tasks.filter(t => t._id !== task._id);
        setProject(projectUpdated);
    }

    const syncTaskStateEdit = (task) => {
        // Update task to state
        const projectUpdated = { ...project };
        projectUpdated.tasks = projectUpdated.tasks.map(t => t._id === task._id ? task : t);
        setProject(projectUpdated);
    }

    const logOutProjects = () => {
        setProject({});
        setProjects([]);
        setAlert({});
    }

    return (
        <ProjectsContext.Provider
            value={{
                projects,
                showAlert,
                alert,
                submitProject,
                getProject,
                project,
                isLoading,
                deleteProject,
                modalFormTask,
                handleModalTask,
                submitTask,
                handleModalEditTask,
                task,
                modalDeleteTask,
                handleModalDeleteTask,
                deleteTask,
                submitCollab,
                collaborator,
                addCollaborator,
                modalDeleteCollab,
                handleModalDeleteCollab,
                deleteCollab,
                completeTask,
                searchEngine,
                handleSearchEngine,
                syncTaskState,
                syncTaskStateDelete,
                syncTaskStateEdit,
                logOutProjects
            }}
        >
            {children}
        </ProjectsContext.Provider>
    )
}

export {
    ProjectsProvider
}
export default ProjectsContext;
