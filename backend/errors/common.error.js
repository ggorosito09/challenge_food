const errorHandler = (res, error) => {
    res.status(500).json({ message: error.message });
};

export default errorHandler;