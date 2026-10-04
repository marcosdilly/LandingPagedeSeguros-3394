import { useMutation, useQuery } from "@tanstack/react-query";
import { orpc } from "../lib/api";

export function useCreateLead() {
  return useMutation(orpc.leads.create.mutationOptions());
}

export function useLeads(password: string | null) {
  return useQuery({
    ...orpc.leads.list.queryOptions({ input: { password: password ?? "" } }),
    enabled: !!password,
    retry: false,
  });
}
