import { ColumnDef } from "@tanstack/react-table";
import { useUsers } from "@/hooks/useUsers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export function UsersTable() {
  const { t } = useTranslation(["users", "common"]);
  const { users, isLoading, error, deleteMutation } = useUsers();
  const [search, setSearch] = useState("");

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 rounded-full bg-blue-200 mb-4"></div>
        <p className="text-lg text-gray-600">{t("app.loading", { ns: "common" })}</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4 rounded shadow-md">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">{t("errors.loadingUsers")}</p>
        </div>
      </div>
    </div>
  );

  const filteredUsers = users?.filter((user: User) =>
    `${user.first_name} ${user.last_name} ${user.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "first_name",
      header: t("table.columns.firstName"),
    },
    {
      accessorKey: "last_name",
      header: t("table.columns.lastName"),
    },
    {
      accessorKey: "email",
      header: t("table.columns.email"),
      cell: ({ row }) => (
        <a href={`mailto:${row.original.email}`} className="text-blue-600 hover:text-blue-800 transition-colors">
          {row.original.email}
        </a>
      ),
    },
    {
      id: "actions",
      header: t("table.columns.actions"),
      cell: ({ row }: { row: { original: User } }) => (
        <Button
          onClick={() => deleteMutation.mutate(row.original.id)}
          variant="destructive"
          size="sm"
          className="transition-all hover:scale-105"
        >
          {t("buttons.delete", { ns: "common" })}
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 mx-auto max-w-[1200px]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t("table.title")}</h1>
        
        <div className="relative w-full sm:w-64 md:w-96">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            placeholder={t("table.searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
          />
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
        <DataTable columns={columns} data={filteredUsers ?? []} />
      </div>
    </div>
  );
}

export default UsersTable;