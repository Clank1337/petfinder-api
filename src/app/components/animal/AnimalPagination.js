import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useState } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Input } from 'reactstrap';

const AnimalPagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = (current, total) => {
        const delta = 2; // how many numbers to show around current
        const range = [];
        for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
            range.push(i);
        }
        if (current - delta > 2) range.unshift("...");
        if (current + delta < total - 1) range.push("...");
        range.unshift(1);
        if (total > 1) range.push(total);
        return range;
    };

    const [showJumpBox, setShowJumpBox] = useState(false);
    const [jumpPage, setJumpPage] = useState(currentPage);

    return (
        <div className='d-flex justify-content-center my-3'>
            <Pagination className="justify-content-center my-3">
                <PaginationItem disabled={currentPage <= 1}>
                    <PaginationLink
                        previous
                        onClick={() => onPageChange(currentPage - 1)}
                    />
                </PaginationItem>

                {getPageNumbers(currentPage, totalPages).map((page, idx) => {
                    if (page === "...") {
                        return (
                            <PaginationItem key={`ellipsis-${idx}`}>
                                <PaginationLink onClick={() => setShowJumpBox(true)}>
                                    …
                                </PaginationLink>
                            </PaginationItem>
                        );
                    }
                    return (
                        <PaginationItem active={page === currentPage} key={page}>
                            <PaginationLink onClick={() => onPageChange(page)}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                <PaginationItem disabled={currentPage >= totalPages}>
                    <PaginationLink
                        next
                        onClick={() => onPageChange(currentPage + 1)}
                    />
                </PaginationItem>
            </Pagination>
            <Modal isOpen={showJumpBox} toggle={() => setShowJumpBox(false)}>
                <ModalHeader toggle={() => setShowJumpBox(false)}>
                    Jump to Page
                </ModalHeader>
                <ModalBody>
                    <Input
                        type="number"
                        min="1"
                        max={totalPages}
                        value={jumpPage}
                        onChange={(e) => setJumpPage(e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            onPageChange(Number(jumpPage));
                            setShowJumpBox(false);
                        }}
                    >
                        Go
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default AnimalPagination;
