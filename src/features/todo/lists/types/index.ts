export interface ListsResponse {
  data: ListsData[];
  pagination: PaginationData;
}

export interface ListsData {
    id: string;
    title: string;
    deadline: string;
    owner: {
        id: string;
        email: string;
        name: string;
        role: string;
    };
    createdAt: string;
    updatedAt: string;
    totalTasks: number;
    completedTasks: number;
    hexColor: string;
    tasks: TasksData[];
}

interface PaginationData {
    total: number
    limit: number;
    offset: number;
    hasMore: boolean;
    currentPage: number;
    totalPages: number;
}

interface TasksData {
    id: string;
    title: string;
    status: string;
    isWeeklyGoal: boolean;
}