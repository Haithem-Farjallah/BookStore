import React from "react";
import BooksComments from "./BookComments";
import { Tab } from "@headlessui/react";

const Tabs = ({ result }) => {
  return (
    <div className="w-full ">
      <Tab.Group>
        <Tab.List className="shadow flex items-center justify-around h-[10vh]">
          <Tab>
            {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              <button
                className={
                  selected
                    ? "text-bgreen font-semibold text-2xl"
                    : " text-pgray text-2xl font-semibold"
                }
              >
                Description
              </button>
            )}
          </Tab>
          <Tab>
            {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              <button
                className={
                  selected
                    ? "text-bgreen font-semibold text-2xl"
                    : " text-pgray text-2xl font-semibold"
                }
              >
                Comments
              </button>
            )}
          </Tab>
          <Tab>
            {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              <button
                className={
                  selected
                    ? "text-bgreen font-semibold text-2xl"
                    : " text-pgray text-2xl font-semibold"
                }
              >
                Recommended
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="h-[50vh] p-10 text-xl  text-pgray font-medium ">
            {" "}
            {result.description}{" "}
          </Tab.Panel>
          <Tab.Panel>
            <BooksComments id={result._id} />
          </Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Tabs;
