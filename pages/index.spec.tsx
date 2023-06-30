import {render, screen} from "@testing-library/react";
import IndexPage from "dh-marvel/pages/index.page";
import Index from "dh-marvel/pages/index.page";
import comics from "dh-marvel/test/mocks/comics";
import { IComicsMarvel, IResult } from "types/Comic";

describe('IndexPage', () => {
    describe('when rendering default', () => {
        it('should render the title', () => {
            render(<Index comics={comics as unknown as IComicsMarvel} />)
            const title = screen.getByText('Marvel Comics')
            expect(title).toBeInTheDocument()
        })
    })

})