import { FileService } from '../common/file.service';
import { Stock } from './entities/stock.entity';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
export declare class StocksService {
    private readonly fileService;
    constructor(fileService: FileService<Stock[]>);
    create(createStockDto: CreateStockDto): Stock;
    findAll(title?: string): Stock[];
    findOne(id: number): Stock;
    update(id: number, updateStockDto: UpdateStockDto): Stock;
    remove(id: number): void;
}
