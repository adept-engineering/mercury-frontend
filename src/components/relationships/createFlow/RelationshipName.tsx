"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEntities } from "@/hooks/use-entity";
import { useSession } from "next-auth/react";
import { useCurrentSession } from "@/hooks/use-current-session";

export function RelationshipDetails() {
  const { session } = useCurrentSession();
  const { data: entities } = useEntities(session?.user.token || "");

  const filterEntities = (entityId: string) => {
    return entities;
  };
  return (
    <div className="space-y-6 ">
      <div className="space-y-2">
        <Label htmlFor="relationship-name" className="text-sm font-medium">
          Relationship Name
        </Label>
        <Input
          id="relationship-name"
          type="text"
          placeholder="Enter relationship name"
          className="w-full"
        />
      </div>

      <section className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sender-entity" className="text-sm font-medium">
            Sender Entity
          </Label>
          <Select>
            <SelectTrigger className="w-full" id="sender-entity">
              <SelectValue placeholder="Select sender entity" />
            </SelectTrigger>
            <SelectContent>
              {entities?.map((entity) => (
                <SelectItem key={entity.id} value={entity.id}>
                  {entity.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sender-entity" className="text-sm font-medium">
            Receiver Entity
          </Label>
          <Select>
            <SelectTrigger className="w-full" id="sender-entity">
              <SelectValue placeholder="Select reciever entity" />
            </SelectTrigger>
            <SelectContent>
              {entities?.map((entity) => (
                <SelectItem key={entity.id} value={entity.id}>
                  {entity.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      <div className="space-y-2">
        <Label htmlFor="sender-entity" className="text-sm font-medium">
          Sender Reference
        </Label>
        <Select>
          <SelectTrigger className="w-full" id="sender-entity">
            <SelectValue placeholder="Select Sender format type" />
          </SelectTrigger>
          <SelectContent>
            {entities &&
              entities[0].entityidtbl.map((entity) => (
                <SelectItem
                  key={entity.reference_id_type}
                  value={entity.reference_id_type}
                >
                  {entity.reference_id_type}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sender-entity" className="text-sm font-medium">
          Select Edi/Edifact Format
        </Label>
        <Select>
          <SelectTrigger className="w-full" id="sender-entity">
            <SelectValue placeholder="Select Sender format type" />
          </SelectTrigger>
          <SelectContent>
            {entities &&
              entities[0].entityidtbl.map((entity) => (
                <SelectItem
                  key={entity.reference_id_type}
                  value={entity.reference_id_type}
                >
                  {entity.reference_id_type}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
