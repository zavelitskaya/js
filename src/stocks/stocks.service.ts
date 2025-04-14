import { Injectable } from '@nestjs/common';
import { FileService } from '../common/file.service';
import { Stock } from './entities/stock.entity';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StocksService {
  constructor(private readonly fileService: FileService<Stock[]>) {}

  create(createStockDto: CreateStockDto): Stock {
    const stocks = this.fileService.read();
    const newStock = {
      id: stocks.length + 1,
      ...createStockDto,
    };
    stocks.push(newStock);
    this.fileService.write(stocks);
    return newStock;
  }

  findAll(title?: string): Stock[] {
    const stocks = this.fileService.read();
    return title
      ? stocks.filter(stock =>
          stock.title.toLowerCase().includes(title.toLowerCase()),
        )
      : stocks;
  }

  findOne(id: number): Stock {
    const stocks = this.fileService.read();
    const stock = stocks.find(s => s.id === id);
    if (!stock) {
      throw new Error('Stock not found');
    }
    return stock;
  }

  update(id: number, updateStockDto: UpdateStockDto): Stock {
    const stocks = this.fileService.read();
    const index = stocks.findIndex(s => s.id === id);
    
    if (index === -1) {
      throw new Error('Stock not found');
    }

    const updatedStock = { ...stocks[index], ...updateStockDto };
    stocks[index] = updatedStock;
    this.fileService.write(stocks);
    return updatedStock;
  }

  remove(id: number): void {
    const stocks = this.fileService.read();
    const filteredStocks = stocks.filter(s => s.id !== id);
    
    if (stocks.length === filteredStocks.length) {
      throw new Error('Stock not found');
    }

    this.fileService.write(filteredStocks);
  }
}