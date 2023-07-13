import * as React from "react";
import { RenderOptions } from "@testing-library/react";
declare const customRender: (ui: React.ReactElement, options?: RenderOptions<typeof import("@testing-library/dom/types/queries")> | undefined) => import("@testing-library/react").RenderResult<typeof import("@testing-library/dom/types/queries")>;
export { customRender as render };
