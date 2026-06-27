import { Label } from "@heroui/react";
import { FieldError } from "@heroui/react";
import { Radio } from "@heroui/react";
import { RadioGroup } from "@heroui/react";
import React from "react";

const UserRole = () => {
  return (
    <RadioGroup
      name="role"
      isRequired
      defaultValue="traveler"
      className="flex flex-col gap-2"
    >
      <Label className="text-slate-700 dark:text-secondary font-semibold text-sm">
        Join as a
      </Label>

      <div className="flex gap-6 items-center mt-2">
        <Radio value="traveler">
          <Radio.Content className="flex items-center gap-2 cursor-pointer group">
            <Radio.Control className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center group-data-[selected=true]:border-[#6367FF] group-data-[selected=true]:bg-[#6367FF] transition-all">
              <Radio.Indicator>
                <span className="w-2 h-2 rounded-full bg-white block" />
              </Radio.Indicator>
            </Radio.Control>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-data-[selected=true]:text-[#6367FF] dark:group-data-[selected=true]:text-primary">
              Traveler
            </span>
          </Radio.Content>
        </Radio>

        <Radio value="vendor">
          <Radio.Content className="flex items-center gap-2 cursor-pointer group">
            <Radio.Control className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center group-data-[selected=true]:border-[#6367FF] group-data-[selected=true]:bg-[#6367FF] transition-all">
              <Radio.Indicator>
                <span className="w-2 h-2 rounded-full bg-white block" />
              </Radio.Indicator>
            </Radio.Control>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-data-[selected=true]:text-[#6367FF] dark:group-data-[selected=true]:text-primary">
              Vendor
            </span>
          </Radio.Content>
        </Radio>
      </div>

      <FieldError className="text-xs text-rose-500 mt-1" />
    </RadioGroup>
  );
};

export default UserRole;
